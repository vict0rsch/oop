from django.contrib import admin
from medias.models import *

# To be Done:
# class MediaAdmin(admin.ModelAdmin):
#     list_display = ('titre', 'auteur', 'date')
#     list_filter = ('auteur', 'categorie',)
#     date_hierarchy = 'date'
#     ordering = ('date', )
#     search_fields = ('titre', 'contenu')

admin.site.register(Media)
admin.site.register(Owner)
admin.site.register(User)
admin.site.register(Share)
admin.site.register(Visit)
