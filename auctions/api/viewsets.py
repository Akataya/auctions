from ..models import Auction, Bid, Comment
from .serializers import AuctionLISTSerializer, AuctionSerializer, AuctionRETRIEVESerializer, BidSerializer, \
    BidGETSerializer, CommentSerializer
from rest_framework import viewsets, permissions
from .permissions import IsOwnerOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response


class AuctionViewSet(viewsets.ModelViewSet):
    # List, create, retrieve, update, partial_update, destroy
    queryset = Auction.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return AuctionLISTSerializer
        elif self.action == 'retrieve':
            return AuctionRETRIEVESerializer
        return AuctionSerializer

    @action(detail=True, methods=['GET'])
    def bids(self, request, pk=None):
        auction = self.get_object()
        bids = Bid.objects.filter(auction=auction)
        serializer = BidGETSerializer(bids, many=True)
        return Response(serializer.data, status=200)

    permission_classes = (IsOwnerOrReadOnly,)
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head']


class BidViewSet(viewsets.ModelViewSet):
    # List, create, retrieve, update, partial_update, destroy
    queryset = Bid.objects.all()

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return BidGETSerializer
        return BidSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    http_method_names = ['get', 'post', 'put', 'patch', 'delete', 'head']


class CommentViewSet(viewsets.ModelViewSet):
    # List, create, retrieve, update, partial_update, destroy
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'post', 'delete', 'head']


#rest hook
from rest_framework import viewsets

from rest_hooks.models import Hook

from .serializers import HookSerializer


class HookViewSet(viewsets.ModelViewSet):
    """
    Retrieve, create, update or destroy webhooks.
    """
    model = Hook
    serializer_class = HookSerializer

    def pre_save(self, obj):
        super(HookViewSet, self).pre_save(obj)
        obj.user = self.request.user

