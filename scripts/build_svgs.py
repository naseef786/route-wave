import base64

with open(r'd:\Projects\Route Wave\public\logo-symbol.png', 'rb') as f:
    sym_b64 = base64.b64encode(f.read()).decode('utf-8')

with open(r'd:\Projects\Route Wave\public\logo-horizontal-light.png', 'rb') as f:
    light_b64 = base64.b64encode(f.read()).decode('utf-8')

with open(r'd:\Projects\Route Wave\public\logo-horizontal-dark.png', 'rb') as f:
    dark_b64 = base64.b64encode(f.read()).decode('utf-8')

icon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 301" width="390" height="301">
  <image href="data:image/png;base64,{sym_b64}" x="0" y="0" width="390" height="301" />
</svg>
'''
with open(r'd:\Projects\Route Wave\src\app\icon.svg', 'w', encoding='utf-8') as f:
    f.write(icon_svg)

with open(r'd:\Projects\Route Wave\public\logo-symbol.svg', 'w', encoding='utf-8') as f:
    f.write(icon_svg)

light_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1003 303" width="1003" height="303">
  <image href="data:image/png;base64,{light_b64}" x="0" y="0" width="1003" height="303" />
</svg>
'''
with open(r'd:\Projects\Route Wave\public\logo-horizontal-light.svg', 'w', encoding='utf-8') as f:
    f.write(light_svg)

dark_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1003 303" width="1003" height="303">
  <image href="data:image/png;base64,{dark_b64}" x="0" y="0" width="1003" height="303" />
</svg>
'''
with open(r'd:\Projects\Route Wave\public\logo-horizontal-dark.svg', 'w', encoding='utf-8') as f:
    f.write(dark_svg)

print("SVG files generated successfully with master 3D logo!")
