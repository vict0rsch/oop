if __name__ == '__main__':
    for file_title in ['intentFr', 'intentEn']:
        print(file_title, '...', end='')
        myFile = './src/static/texts/' + file_title
        newLines = ["const text = ["]

        with open(myFile + '.md', 'r') as f:
            lines = f.readlines()

        for l in lines:
            newLines.append(
                "'" + l.replace("'", "\\'").replace("\n", "\\n") + "',\n"
            )
        newLines.append('].join("");\n\nexport default text;')

        with open(myFile + '.js', 'w') as f:
            f.writelines(newLines)
        print(' done')
