from medias.models import *

def load_node_from_entity():

    Media.objects.all().delete()
    Company.objects.all().delete()
    Individual.objects.all().delete()

    ind = Entity.objects.filter(category='i')
    med = Entity.objects.filter(category='m')
    com = Entity.objects.filter(category='c')

    for i in ind:
        n = Individual.objects.create(
            name=i.name,
            website=i.website,
            wiki=i.wiki,
            long_name=i.long_name,
            rank=i.rank,
            other_groups=i.other_groups)
        n.save()

    for m in med:
        n = Media.objects.create(
            name=m.name,
            website=m.website,
            wiki=m.wiki,
            long_name=m.long_name)
        n.save()

    for c in com:
        n = Company.objects.create(
            name=c.name,
            website=c.website,
            wiki=c.wiki,
            long_name=c.long_name)
        n.save()