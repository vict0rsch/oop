from medias.models import *


def get_entitys_from_list(names):
    entitys = []
    for n in names:

        try:
            entitys.append(Entity.objects.get(name=n))
        except:
            print("Error adding :", n)

    return entitys


def create_shares_100(company_name, media_names):
    c = Entity.objects.get(category='c', name=company_name)
    medias = get_entitys_from_list(media_names)
    nb = len(medias)
    count = 0
    for m in medias:
        s = Share(
            share=100,
            child=m,
            parent=c)
        try:
            s.save()
            count += 1
            print('added')
            print(m.name, ' ', company_name)
        except ValidationError:
            pass
    print('Saved {0}/{1} Shares'.format(count, nb))


def title(name):
    if name[-1] == " ":
        name = name[:-1]
    tab = name.split(" ")
    titled_tab = []
    for word in tab:
        try:
            s = sum(1 for c in word if c.isupper())
            if s == 0 and not word[0].isdigit():
                w = word.title()
            else:
                w = word
            w = score_in_word(w)
            titled_tab.append(w)
        except Exception as e:
            print(e)
            print(name)
            print(" -", word, "-")
    return " ".join(w for w in titled_tab)


def score_in_word(word):
    if "-" not in word:
        return word
    else:
        if len(word) == 1:
            return word
        elif word.index("-") == 0:
            return "- " + word[1:]
        elif word.index("-") == len(word) - 1:
            return word[:-1] + " -"
        else:
            t = word.split("-")
            return "-".join(w.title() for w in t)
