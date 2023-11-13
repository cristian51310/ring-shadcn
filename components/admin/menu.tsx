import {
  Menubar, MenubarCheckboxItem, MenubarContent,
  MenubarItem, MenubarLabel, MenubarMenu,
  MenubarRadioGroup, MenubarRadioItem, MenubarSeparator,
  MenubarSub, MenubarSubContent, MenubarSubTrigger,
  MenubarTrigger
} from "@/components/ui/menubar"

export function Menu() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">

      <MenubarMenu>
        <MenubarTrigger className="font-bold">Dashboard Ring!</MenubarTrigger>

        <MenubarContent>
          <MenubarItem>About Music</MenubarItem>
          <MenubarItem>Preferences...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="relative">File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>New</MenubarSubTrigger>
            <MenubarSubContent className="w-[230px]">
              <MenubarItem>Playlist</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>Undo</MenubarItem>
          <MenubarItem disabled>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Show Playing Next</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>Show Lyrics</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hidden md:block">Account</MenubarTrigger>
        <MenubarContent forceMount>
          <MenubarLabel inset>Switch Account</MenubarLabel>
          <MenubarSeparator />

          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
          </MenubarRadioGroup>

          <MenubarSeparator />
          <MenubarItem inset>Add Account...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}