# -*- mode: python -*-

added_files = [
    ('./gui/dist', 'gui/dist'),
]

a = Analysis(['./main.py'],
             pathex=['./dist'],
             binaries=None,
             datas=added_files,
             hiddenimports=['clr'],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=None)
pyz = PYZ(a.pure, a.zipped_data, cipher=None)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='teknee',
          debug=False,
          strip=True,
          #icon='./src/assets/\logo.ico',
          upx=True,
          console=False) # set this to see error output of the executable
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=False,
               name='teknee')