#!/usr/bin/env python3
"""
Парсер JavaScript функций
Извлекает функции из .js файлов с сохранением форматирования
"""

import argparse
import logging
import re
import sys
from pathlib import Path
from typing import List, Dict, Optional, Tuple, Any

try:
    import pyjsparser
    JSPARSER_AVAILABLE = True
except ImportError:
    try:
        import esprima
        JSPARSER_AVAILABLE = True
    except ImportError:
        JSPARSER_AVAILABLE = False
        print("Внимание: ни pyjsparser, ни esprima не установлены. Установите одну из библиотек.")
        print("pip install pyjsparser")
        print("или")
        print("pip install esprima")

try:
    import jsbeautifier
    JSBEAUTIFIER_AVAILABLE = True
except ImportError:
    JSBEAUTIFIER_AVAILABLE = False
    print("Внимание: jsbeautifier не установлен. Установите: pip install jsbeautifier")


class JavaScriptFunctionParser:
    """Парсер JavaScript функций"""
    
    def __init__(self, preserve_formatting: bool = True, extract_all: bool = True):
        self.preserve_formatting = preserve_formatting
        self.extract_all = extract_all
        self.functions = []
        self.current_source = ""
        self.setup_logging()
        
    def setup_logging(self):
        """Настройка логирования"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            datefmt='%H:%M:%S'
        )
        self.logger = logging.getLogger(__name__)
        
    def read_file(self, filepath: str) -> str:
        """Чтение исходного файла"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            self.logger.info(f"Файл прочитан: {filepath}")
            return content
        except FileNotFoundError:
            self.logger.error(f"Файл не найден: {filepath}")
            raise
        except Exception as e:
            self.logger.error(f"Ошибка чтения файла: {e}")
            raise
    
    def write_file(self, filepath: str, content: str):
        """Запись результата в файл"""
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            self.logger.info(f"Результат записан в: {filepath}")
        except Exception as e:
            self.logger.error(f"Ошибка записи файла: {e}")
            raise
    
    def extract_function_code(self, start: int, end: int) -> str:
        """Извлечение кода функции по позициям"""
        code = self.current_source[start:end]
        if self.preserve_formatting:
            return code
        else:
            return self.format_code(code)
    
    def format_code(self, code: str) -> str:
        """Форматирование кода с помощью jsbeautifier"""
        if JSBEAUTIFIER_AVAILABLE:
            try:
                opts = jsbeautifier.default_options()
                opts.indent_size = 2
                opts.space_in_empty_paren = True
                return jsbeautifier.beautify(code, opts)
            except Exception as e:
                self.logger.warning(f"Ошибка форматирования: {e}")
                return code
        return code
    
    def parse_with_pyjsparser(self, source: str):
        """Парсинг с использованием pyjsparser"""
        try:
            return pyjsparser.parse(source)
        except Exception as e:
            self.logger.error(f"Ошибка парсинга pyjsparser: {e}")
            raise
    
    def parse_with_esprima(self, source: str):
        """Парсинг с использованием esprima"""
        try:
            return esprima.parse(source, loc=True, comment=True)
        except Exception as e:
            self.logger.error(f"Ошибка парсинга esprima: {e}")
            raise
    
    def parse_ast(self, source: str):
        """Парсинг исходного кода в AST"""
        self.current_source = source
        
        if 'pyjsparser' in sys.modules:
            return self.parse_with_pyjsparser(source)
        elif 'esprima' in sys.modules:
            return self.parse_with_esprima(source)
        else:
            raise ImportError("Не установлены парсеры JavaScript")
    
    def traverse_ast(self, node: Any, parent: Any = None):
        """Рекурсивный обход AST дерева"""
        
        if not node or not isinstance(node, (dict, list)):
            return
        
        # Обработка узлов-функций
        node_type = node.get('type') if isinstance(node, dict) else None
        
        # Function Declaration
        if node_type in ['FunctionDeclaration', 'FunctionExpression']:
            self.extract_function(node, parent)
        
        # Arrow Function
        elif node_type == 'ArrowFunctionExpression':
            self.extract_arrow_function(node, parent)
        
        # Method Definition
        elif node_type == 'MethodDefinition':
            self.extract_method(node, parent)
        
        # Async Function
        elif node_type in ['AsyncFunctionDeclaration', 'AsyncFunctionExpression']:
            self.extract_async_function(node, parent)
        
        # Generator Function
        elif node_type == 'FunctionDeclaration' and node.get('generator'):
            self.extract_generator_function(node, parent)
        
        # Object Property (методы объектов)
        elif node_type == 'Property' and node.get('method'):
            self.extract_object_method(node, parent)
        
        # Class Method
        elif node_type == 'ClassMethod':
            self.extract_class_method(node, parent)
        
        # Экспортируемые функции
        elif node_type == 'ExportNamedDeclaration' or node_type == 'ExportDefaultDeclaration':
            declaration = node.get('declaration')
            if declaration and declaration.get('type') in ['FunctionDeclaration', 'AsyncFunctionDeclaration']:
                self.extract_exported_function(node, parent)
        
        # Декораторы
        elif node_type == 'Decorator':
            self.extract_decorated_function(node, parent)
        
        # IIFE (Immediately Invoked Function Expression)
        elif node_type == 'CallExpression':
            self.check_for_iife(node, parent)
        
        # Рекурсивный обход дочерних узлов
        if isinstance(node, dict):
            for key, value in node.items():
                if isinstance(value, (dict, list)):
                    self.traverse_ast(value, node)
        elif isinstance(node, list):
            for item in node:
                self.traverse_ast(item, parent)
    
    def extract_function(self, node: dict, parent: dict):
        """Извлечение обычной функции"""
        try:
            # Получение позиций в исходном коде
            loc = node.get('loc', {})
            start_line = loc.get('start', {}).get('line', 0)
            end_line = loc.get('end', {}).get('line', 0)
            
            # Для pyjsparser
            if 'range' in node:
                start_pos, end_pos = node['range']
                code = self.extract_function_code(start_pos, end_pos)
            else:
                # Для esprima с loc
                start_pos = loc.get('start', {}).get('index', 0)
                end_pos = loc.get('end', {}).get('index', 0)
                code = self.extract_function_code(start_pos, end_pos)
            
            # Получение имени функции
            name = 'anonymous'
            if node.get('id') and node['id'].get('name'):
                name = node['id']['name']
            
            # Получение параметров
            params = []
            for param in node.get('params', []):
                if param.get('type') == 'Identifier':
                    params.append(param.get('name', ''))
                elif param.get('type') == 'RestElement':
                    params.append('...' + param.get('argument', {}).get('name', ''))
                elif param.get('type') == 'AssignmentPattern':
                    left = param.get('left', {})
                    if left.get('type') == 'Identifier':
                        params.append(left.get('name', ''))
            
            self.functions.append({
                'name': name,
                'type': 'function',
                'code': code,
                'start_line': start_line,
                'end_line': end_line,
                'params': params,
                'async': node.get('async', False),
                'generator': node.get('generator', False)
            })
            
            self.logger.debug(f"Найдена функция: {name} (строки {start_line}-{end_line})")
            
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения функции: {e}")
    
    def extract_arrow_function(self, node: dict, parent: dict):
        """Извлечение стрелочной функции"""
        try:
            # Получение позиций
            loc = node.get('loc', {})
            start_line = loc.get('start', {}).get('line', 0)
            end_line = loc.get('end', {}).get('line', 0)
            
            # Определение имени из контекста
            name = 'arrow_function'
            if parent:
                # Проверяем, является ли родителем объявление переменной
                if parent.get('type') == 'VariableDeclarator' and parent.get('id'):
                    name = parent['id'].get('name', 'arrow_function')
                # Или присваивание
                elif parent.get('type') == 'AssignmentExpression' and parent.get('left'):
                    left = parent['left']
                    if left.get('type') == 'Identifier':
                        name = left.get('name', 'arrow_function')
            
            # Извлечение кода
            if 'range' in node:
                start_pos, end_pos = node['range']
                code = self.extract_function_code(start_pos, end_pos)
            else:
                start_pos = loc.get('start', {}).get('index', 0)
                end_pos = loc.get('end', {}).get('index', 0)
                code = self.extract_function_code(start_pos, end_pos)
            
            # Получение параметров
            params = []
            for param in node.get('params', []):
                if param.get('type') == 'Identifier':
                    params.append(param.get('name', ''))
                elif param.get('type') == 'RestElement':
                    params.append('...' + param.get('argument', {}).get('name', ''))
            
            self.functions.append({
                'name': name,
                'type': 'arrow_function',
                'code': code,
                'start_line': start_line,
                'end_line': end_line,
                'params': params,
                'async': node.get('async', False)
            })
            
            self.logger.debug(f"Найдена стрелочная функция: {name}")
            
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения стрелочной функции: {e}")
    
    def extract_method(self, node: dict, parent: dict):
        """Извлечение метода"""
        try:
            # Получение позиций
            loc = node.get('loc', {})
            start_line = loc.get('start', {}).get('line', 0)
            end_line = loc.get('end', {}).get('line', 0)
            
            # Имя метода
            key = node.get('key', {})
            name = key.get('name', 'method') if key else 'method'
            
            # Извлечение кода
            if 'range' in node:
                start_pos, end_pos = node['range']
                code = self.extract_function_code(start_pos, end_pos)
            else:
                start_pos = loc.get('start', {}).get('index', 0)
                end_pos = loc.get('end', {}).get('index', 0)
                code = self.extract_function_code(start_pos, end_pos)
            
            # Получение параметров из value (функции)
            params = []
            value = node.get('value', {})
            for param in value.get('params', []):
                if param.get('type') == 'Identifier':
                    params.append(param.get('name', ''))
            
            self.functions.append({
                'name': name,
                'type': 'method',
                'code': code,
                'start_line': start_line,
                'end_line': end_line,
                'params': params,
                'async': value.get('async', False),
                'generator': value.get('generator', False),
                'static': node.get('static', False)
            })
            
            self.logger.debug(f"Найден метод: {name}")
            
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения метода: {e}")
    
    def extract_async_function(self, node: dict, parent: dict):
        """Извлечение асинхронной функции"""
        try:
            # Используем общий метод извлечения с флагом async
            self.extract_function(node, parent)
            # Обновляем последнюю добавленную функцию
            if self.functions:
                self.functions[-1]['type'] = 'async_function'
                
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения async функции: {e}")
    
    def extract_generator_function(self, node: dict, parent: dict):
        """Извлечение функции-генератора"""
        try:
            self.extract_function(node, parent)
            if self.functions:
                self.functions[-1]['type'] = 'generator_function'
                
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения generator функции: {e}")
    
    def extract_object_method(self, node: dict, parent: dict):
        """Извлечение метода объекта"""
        try:
            # Похоже на extract_method, но для объектов
            loc = node.get('loc', {})
            start_line = loc.get('start', {}).get('line', 0)
            end_line = loc.get('end', {}).get('line', 0)
            
            key = node.get('key', {})
            name = key.get('name', 'method') if key else 'method'
            
            if 'range' in node:
                start_pos, end_pos = node['range']
                code = self.extract_function_code(start_pos, end_pos)
            else:
                start_pos = loc.get('start', {}).get('index', 0)
                end_pos = loc.get('end', {}).get('index', 0)
                code = self.extract_function_code(start_pos, end_pos)
            
            self.functions.append({
                'name': name,
                'type': 'object_method',
                'code': code,
                'start_line': start_line,
                'end_line': end_line
            })
            
            self.logger.debug(f"Найден метод объекта: {name}")
            
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения метода объекта: {e}")
    
    def extract_class_method(self, node: dict, parent: dict):
        """Извлечение метода класса"""
        try:
            self.extract_method(node, parent)
            if self.functions:
                self.functions[-1]['type'] = 'class_method'
                
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения метода класса: {e}")
    
    def extract_exported_function(self, node: dict, parent: dict):
        """Извлечение экспортируемой функции"""
        try:
            declaration = node.get('declaration')
            if declaration:
                self.extract_function(declaration, node)
                if self.functions:
                    self.functions[-1]['type'] = 'exported_function'
                    if node.get('type') == 'ExportDefaultDeclaration':
                        self.functions[-1]['export_type'] = 'default'
                    else:
                        self.functions[-1]['export_type'] = 'named'
                        
        except Exception as e:
            self.logger.warning(f"Ошибка извлечения экспортируемой функции: {e}")
    
    def extract_decorated_function(self, node: dict, parent: dict):
        """Извлечение функции с декоратором"""
        try:
            # Логика для обработки декораторов
            self.logger.debug("Найдена функция с декоратором")
            # Здесь можно добавить специальную обработку
        except Exception as e:
            self.logger.warning(f"Ошибка обработки декоратора: {e}")
    
    def check_for_iife(self, node: dict, parent: dict):
        """Проверка на IIFE (Immediately Invoked Function Expression)"""
        try:
            # Проверяем, является ли вызов функциональным выражением
            callee = node.get('callee')
            if callee and callee.get('type') in ['FunctionExpression', 'ArrowFunctionExpression']:
                # Это IIFE
                loc = node.get('loc', {})
                start_line = loc.get('start', {}).get('line', 0)
                end_line = loc.get('end', {}).get('line', 0)
                
                if 'range' in node:
                    start_pos, end_pos = node['range']
                    code = self.extract_function_code(start_pos, end_pos)
                else:
                    start_pos = loc.get('start', {}).get('index', 0)
                    end_pos = loc.get('end', {}).get('index', 0)
                    code = self.extract_function_code(start_pos, end_pos)
                
                self.functions.append({
                    'name': 'iife',
                    'type': 'iife',
                    'code': code,
                    'start_line': start_line,
                    'end_line': end_line,
                    'params': []
                })
                
                self.logger.debug(f"Найден IIFE")
                
        except Exception as e:
            self.logger.warning(f"Ошибка проверки IIFE: {e}")
    
    def find_functions_by_regex(self, source: str):
        """Поиск функций с помощью регулярных выражений (резервный метод)"""
        patterns = [
            # Function declaration
            r'(async\s+)?function(\s*\*)?\s+(\w+)\s*\([^)]*\)\s*\{[^}]*\}',
            # Arrow functions
            r'(?:const|let|var)\s+(\w+)\s*=\s*(async\s*)?\([^)]*\)\s*=>\s*\{[^}]*\}',
            # Object methods
            r'(\w+)\s*\([^)]*\)\s*\{[^}]*\}',
        ]
        
        for pattern in patterns:
            matches = re.finditer(pattern, source, re.DOTALL)
            for match in matches:
                if match.group():
                    # Примерная логика определения номера строки
                    line_num = source[:match.start()].count('\n') + 1
                    self.functions.append({
                        'name': match.group(3) or 'anonymous',
                        'type': 'regex_found',
                        'code': match.group(),
                        'start_line': line_num,
                        'end_line': line_num + match.group().count('\n')
                    })
    
    def generate_output(self, filter_names: List[str] = None) -> str:
        """Генерация выходного содержимого"""
        output_lines = []
        
        for func in self.functions:
            # Фильтрация по имени
            if filter_names and func['name'] not in filter_names:
                continue
            
            # Добавление метаданных
            output_lines.append(f"// {'='*60}")
            output_lines.append(f"// Функция: {func['name']}")
            output_lines.append(f"// Тип: {func['type']}")
            output_lines.append(f"// Строки: {func['start_line']}-{func['end_line']}")
            
            if func.get('params'):
                output_lines.append(f"// Параметры: {', '.join(func['params'])}")
            
            if func.get('async'):
                output_lines.append("// Async: true")
            
            if func.get('generator'):
                output_lines.append("// Generator: true")
            
            if func.get('export_type'):
                output_lines.append(f"// Export: {func['export_type']}")
            
            output_lines.append(f"// {'='*60}")
            output_lines.append("")
            output_lines.append(func['code'])
            output_lines.append("")
            output_lines.append("")
        
        return "\n".join(output_lines)
    
    def parse_file(self, input_file: str, output_file: str = None, 
                   filter_names: List[str] = None):
        """Основной метод парсинга файла"""
        try:
            # Чтение исходного файла
            source = self.read_file(input_file)
            
            # Парсинг AST
            self.logger.info("Парсинг AST...")
            ast = self.parse_ast(source)
            
            # Обход AST
            self.logger.info("Обход AST дерева...")
            self.traverse_ast(ast)
            
            # Резервный поиск через regex, если ничего не найдено
            if not self.functions:
                self.logger.warning("AST парсинг не нашел функций, используем regex...")
                self.find_functions_by_regex(source)
            
            # Генерация вывода
            self.logger.info(f"Найдено функций: {len(self.functions)}")
            
            output_content = self.generate_output(filter_names)
            
            # Запись в файл или вывод в консоль
            if output_file:
                self.write_file(output_file, output_content)
            else:
                print(output_content)
            
            return len(self.functions)
            
        except Exception as e:
            self.logger.error(f"Ошибка парсинга: {e}")
            return 0


def main():
    """Точка входа программы"""
    parser = argparse.ArgumentParser(
        description='Парсер JavaScript функций',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Примеры использования:
  python js_parser.py input.js output.js
  python js_parser.py input.js --extract-all
  python js_parser.py input.js output.js --filter myFunction --filter anotherFunction
  python js_parser.py input.js --preserve-formatting
        """
    )
    
    parser.add_argument('input', help='Входной .js файл')
    parser.add_argument('output', nargs='?', help='Выходной файл (опционально)')
    parser.add_argument('--extract-all', action='store_true', 
                       help='Извлечь все функции (по умолчанию)')
    parser.add_argument('--preserve-formatting', action='store_true', default=True,
                       help='Сохранить исходное форматирование')
    parser.add_argument('--filter', action='append', dest='filter_names',
                       help='Фильтр по имени функции (можно указать несколько)')
    parser.add_argument('--verbose', '-v', action='store_true',
                       help='Подробный вывод')
    parser.add_argument('--no-beautify', action='store_true',
                       help='Не использовать jsbeautifier для форматирования')
    
    args = parser.parse_args()
    
    # Проверка доступности парсеров
    if not JSPARSER_AVAILABLE:
        print("Ошибка: требуется установить pyjsparser или esprima")
        print("pip install pyjsparser")
        sys.exit(1)
    
    # Настройка параметров
    if args.no_beautify:
        global JSBEAUTIFIER_AVAILABLE
        JSBEAUTIFIER_AVAILABLE = False
    
    # Создание парсера
    js_parser = JavaScriptFunctionParser(
        preserve_formatting=args.preserve_formatting,
        extract_all=args.extract_all
    )
    
    # Настройка уровня логирования
    if args.verbose:
        js_parser.logger.setLevel(logging.DEBUG)
    
    # Запуск парсинга
    try:
        count = js_parser.parse_file(
            input_file=args.input,
            output_file=args.output,
            filter_names=args.filter_names
        )
        
        if count > 0:
            print(f"✓ Успешно извлечено {count} функций")
            if args.output:
                print(f"✓ Результат сохранен в {args.output}")
        else:
            print("✗ Функции не найдены")
            
    except KeyboardInterrupt:
        print("\nПрервано пользователем")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Ошибка: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()