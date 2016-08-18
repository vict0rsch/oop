from django.contrib import admin
from medias.models import *


class EntityAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'wiki', 'category')
    list_filter = ('name', 'website', 'category')
    # date_hierarchy = 'date'
    ordering = ('name', 'website', 'category')
    search_fields = ('name', 'website', 'wiki', 'category')

admin.site.register(Entity, EntityAdmin)


class UserAdmin(admin.ModelAdmin):
    list_display = ('pseudo', 'email')
    list_filter = ('pseudo',)
    # date_hierarchy = 'date'
    ordering = ('pseudo', )
    search_fields = ('pseudo', 'email')
admin.site.register(User, UserAdmin)


class ShareAdmin(admin.ModelAdmin):
    list_display = ('entity', 'owner', 'share')
    list_filter = ('entity', 'owner',)
    # date_hierarchy = 'date'
    ordering = ('entity', 'owner')
    search_fields = ('entity', 'owner')
admin.site.register(Share, ShareAdmin)


class VisitAdmin(admin.ModelAdmin):
    list_display = ('media', 'user', 'date')
    list_filter = ('media', 'user', 'date')
    # date_hierarchy = 'date'
    ordering = ('media', 'user', 'date')
    search_fields = ('media', 'user')
admin.site.register(Visit, VisitAdmin)
