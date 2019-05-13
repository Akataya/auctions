from rest_framework import serializers, permissions
from ..models import Auction, Bid, Comment
from users.api.serializers import UserSerializer
from rest_framework.reverse import reverse

# Default auction serializer (POST, PUT, PATCH, DELETE methods)
class AuctionSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Auction
        fields = ('id', 'user', 'title', 'description', 'image', 'base_price', 'start_datetime', 'end_datetime', 'created', 'bids')
        read_only_fields = ('id', 'created', 'bids', 'comments')
        http_method_names = ['post', 'patch', 'put', 'head']


# Auction serializer for GET method | LIST action
class AuctionLISTSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    bid_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = Auction
        fields = ('id', 'user', 'title', 'image', 'base_price', 'start_datetime', 'end_datetime', 'bid_count',
                  'comment_count', 'description', 'bids')
        http_method_names = ['get', 'head']

    # Returns the number of bids associated with an auction
    @staticmethod
    def get_bid_count(obj):
        return obj.bids.count()

    # Returns the number of comments associated with an auction
    @staticmethod
    def get_comment_count(obj):
        return obj.comments.count()


# Bid serializer for GET methods (LIST and RETRIEVE actions)
class BidGETSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Bid
        fields = ('id', 'user', 'auction', 'amount_offered', 'created')


# Auction serializer for GET method | RETRIEVE action
class AuctionRETRIEVESerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Auction
        fields = ('id', 'user', 'title', 'description', 'image', 'base_price', 'start_datetime', 'end_datetime',
                  'created', 'bids', 'comments')


# Default bid serializer (POST, PUT, PATCH, DELETE methods)
class BidSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Bid
        fields = ('id', 'user', 'auction', 'amount_offered', 'created')
        read_only_fields = ('id', 'user', 'created')


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'



# REST-HOOKS
from django.conf import settings
from rest_framework import serializers, exceptions

from rest_hooks.models import Hook


class HookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hook
        read_only_fields = ('user',)