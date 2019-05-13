from rest_framework import routers
from auctions.api.viewsets import AuctionViewSet, BidViewSet, CommentViewSet, HookViewSet
from users.api.viewsets import UserViewSet
from django.conf.urls import url

router = routers.DefaultRouter()
router.register('auctions', AuctionViewSet, base_name='auction')
router.register('bids', BidViewSet, base_name='bid')
router.register('comments', CommentViewSet, base_name='comment')
router.register('accounts', UserViewSet, base_name='accounts')
router.register('webhooks', HookViewSet, base_name='webhook')

urlpatterns = router.urls