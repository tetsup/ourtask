import { CommonFab, CommonFabProps } from '../parts/CommonFab';

export type FabBarButtonParams = Omit<
  CommonFabProps,
  'align' | 'direction' | 'index'
>;

type FabBarProps = {
  buttons: FabBarButtonParams[];
  align: 'left' | 'right';
  direction: 'horizontal' | 'vertical';
};

export const FabBar = ({ buttons, align, direction }: FabBarProps) => {
  return (
    <>
      {buttons.map((button, index) => (
        <CommonFab
          {...button}
          key={index}
          align={align}
          direction={direction}
          index={index}
        />
      ))}
    </>
  );
};
