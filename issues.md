# RESUELTOS

### Problem:
typescript throwing "Property 'className' does not exist on type 'DialogPortalProps'"
when using shadcn SheetPortal component

### Solution:
I temporarily resolved the issue by removing the className from both the props and the sheetPrimitive.portal component.
Although this solution has worked for now, I am uncertain if it might cause problems in the future. However, as of now, my project is functioning correctly.


# POR RESOLVER

### Problem:

en el modo oscuro el color de fondo de los menu dropdown es transparente, esto a su vez hace que el texto de los items del menu no se vea, esto empezo desde que cambie el color del fondo en el modo oscuro, la solucion debe de estar en el archivo global.css, y creo que tambien afecta a los inputs