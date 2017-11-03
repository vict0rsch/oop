if __name__ == '__main__':
    myFile = './src/static/texts/intentFr'
    newLines = ["const text = ["]

    with open(myFile + '.md', 'r') as f:
        lines = f.readlines()

    for l in lines:
        newLines.append(
            "'" + l.replace("'", "\\'").replace("\n", "\\n") + "',\n"
        )
    newLines.append('].join("");\nexport default text;')

    with open(myFile + '.js', 'w') as f:
        f.writelines(newLines)
