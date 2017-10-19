import os
import shutil

if __name__ == '__main__':
    print('Writing new index.html... ', end='')
    with open('./build/index.html', 'r') as f:
        lines = f.readlines()
    lines[0] = lines[0].replace('"/', '"./')
    with open('./build/index.html', 'w') as f:
        f.write(lines[0])
    print('OK')

    if '/Users/victor/Documents' in os.getcwd():
        print('Copying and pushing files to vict0rsch.github.io...', end='')
        os.system('rm -rf ~/Documents/Github/vict0rsch.github.io/react/*')
        os.system('cp -r ./build/* ~/Documents/Github/vict0rsch.github.io/react/')
        os.system('cd ~/Documents/Github/vict0rsch.github.io && rake publish')
        print(' OK')
