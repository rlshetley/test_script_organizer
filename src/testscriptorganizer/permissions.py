from rest_framework import permissions

import logging

class IsInRole(permissions.BasePermission) :
    def has_permission(self, request, view) :
        logger = logging.getLogger("django")

        logger.info('Test log')

        return True
