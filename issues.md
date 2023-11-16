# Problem:
typescript throwing "Property 'className' does not exist on type 'DialogPortalProps'"
when using shadcn SheetPortal component

# Solution:
I temporarily resolved the issue by removing the className from both the props and the sheetPrimitive.portal component.
Although this solution has worked for now, I am uncertain if it might cause problems in the future. However, as of now, my project is functioning correctly.