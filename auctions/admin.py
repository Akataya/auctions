from django.contrib import admin
from .models import Auction, Bid, Comment


@admin.register(Auction)
class AuctionAdmin(admin.ModelAdmin):
    model = Auction
    list_display = ('title', 'user', 'base_price', 'start_datetime', 'end_datetime')


@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    model = Bid
    list_display = ('auction', 'user', 'amount_offered')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    model = Comment
    list_display = ('auction', 'user')
