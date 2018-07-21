
# estatus de un articulo
STATUS_PUBLICATED = 'RDY'
STATUS_INPROGRES = 'INP'

STATUS_INPROGRES = 'INP'
STATUS = (
    (STATUS_PUBLICATED, 'Publicado'),
    (STATUS_INPROGRES, 'No publicado')
)


# Tipo de visibilidad para el articulo
VISIBILITY_PUBLIC = 'PUB'
VISIBILITY_PRIVATE = 'PRI'

VISIBILITY = (
    (VISIBILITY_PUBLIC, 'Pública'),
    (VISIBILITY_PRIVATE, 'Privada')
)

# estados para los tipos diferentes de mensajes.
NOTIFICATION_EMAIL = 'EML'
NOTIFICATION_PUSH = 'PSH'
NOTIFICATION_SMS = 'SMS'
NOTIFICATION_NONE = 'NON'

NOTIFICATION_STATUS = (
    (NOTIFICATION_NONE, 'Sin notificación'),
    (NOTIFICATION_EMAIL, 'Enviado email'),
    (NOTIFICATION_PUSH, 'Notificado push'),
    (NOTIFICATION_SMS, 'Enviado SMS')
)

# paginacion
ITEMS_PER_PAGE = 6