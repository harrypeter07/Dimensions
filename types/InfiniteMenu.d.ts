// types/InfiniteMenu.d.ts
declare module '@/components/InfiniteMenu' {
    interface ItemProps {
      image: string;
      link: string;
      title: string;
      description: string;
    }
  
    interface InfiniteMenuProps {
      items: ItemProps[];
    }
  
    const InfiniteMenu: React.FC<InfiniteMenuProps>;
    export default InfiniteMenu;
    export type { ItemProps };
  }