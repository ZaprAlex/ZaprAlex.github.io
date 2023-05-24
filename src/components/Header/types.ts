type Position = 'fixed' | 'sticky' | 'relative' | 'static';

export interface HeaderProps {
  position?: Position;
  className?: string;
}
