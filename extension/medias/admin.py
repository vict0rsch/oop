from django.contrib import admin
from medias.models import *


class MediaAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'get_owners')
    list_filter = ('name', 'website', 'owner')
    # date_hierarchy = 'date'
    ordering = ('name', )
    search_fields = ('name', 'website', 'owner')

    def get_owners(self, media):
        return u'\n'.join([o.name for o in media.owner.all()])

    get_owners.short_description = 'Owners'
admin.site.register(Media, MediaAdmin)


class OwnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_shares', 'get_nb_medias')
    list_filter = ('name',)
    # date_hierarchy = 'date'
    ordering = ('name', )
    search_fields = ('name',)

    def get_shares(self, owner):
        return u' | '.join(['{1} ({0}%)'.format(
            s.share, s.media) for s in owner.share_set.all()])
    get_shares.short_description = 'Shares'

    def get_queryset(self, request):
        qs = super(OwnerAdmin, self).get_queryset(request)
        qs = qs.annotate(models.Count('media'))
        return qs

    def get_nb_medias(self, obj):
        return obj.media__count
    get_nb_medias.admin_order_field = 'media__count'
    get_nb_medias.short_description = '# of participations in medias'


admin.site.register(Owner, OwnerAdmin)


class UserAdmin(admin.ModelAdmin):
    list_display = ('pseudo', 'email')
    list_filter = ('pseudo',)
    # date_hierarchy = 'date'
    ordering = ('pseudo', )
    search_fields = ('pseudo', 'email')
admin.site.register(User, UserAdmin)


class ShareAdmin(admin.ModelAdmin):
    list_display = ('media', 'owner', 'share')
    list_filter = ('media', 'owner',)
    # date_hierarchy = 'date'
    ordering = ('media', 'owner')
    search_fields = ('media', 'owner')
admin.site.register(Share, ShareAdmin)


class VisitAdmin(admin.ModelAdmin):
    list_display = ('media', 'user', 'date')
    list_filter = ('media', 'user', 'date')
    # date_hierarchy = 'date'
    ordering = ('media', 'user', 'date')
    search_fields = ('media', 'user')
admin.site.register(Visit, VisitAdmin)
