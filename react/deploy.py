import os
import json

if __name__ == '__main__':

    if '/Users/victor/Documents' in os.getcwd():

        print('Copying and pushing files to vict0rsch.github.io...', end='')
        os.system('rm -rf ~/Documents/Github/vict0rsch.github.io/oop/react/*')
        os.system(
            'cp -r ./build/* ~/Documents/Github/vict0rsch.github.io/oop/react/')
        os.system('cd ~/Documents/Github/vict0rsch.github.io && rake publish')
        print(' OK')

        with open('./package.json', 'r') as f:
            obj = json.load(f)

        if hasattr(obj, 'homepage'):
            del obj['homepage']

        with open('./package.json', 'w') as f:
            json.dump(obj, f)
