from rest_framework import permissions

import logging

class IsInRole(permissions.BasePermission) :
    def has_permission(self, request, view) :
        logger = logging.getLogger(__name__)
        
        logger.info('Test log')
        
        logger.info(view)
        
        return request.user and request.user.is_authenticated()