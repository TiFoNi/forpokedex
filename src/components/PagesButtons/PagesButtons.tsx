import { Button } from "react-bootstrap";
import s from "./PageButtons.module.scss";

interface PageButtonsProps {
  totalPagesCount: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const PageButtons: React.FC<PageButtonsProps> = ({
  totalPagesCount,
  currentPage,
  handlePageChange,
}) => {
  const maxVisibleButtons = 10;

  const calculateStartIndex = () => {
    if (totalPagesCount <= maxVisibleButtons) {
      return 1;
    }

    if (currentPage <= Math.ceil(maxVisibleButtons / 2)) {
      return 1;
    }

    if (currentPage >= totalPagesCount - Math.floor(maxVisibleButtons / 2)) {
      return totalPagesCount - maxVisibleButtons + 1;
    }

    return currentPage - Math.floor(maxVisibleButtons / 2);
  };

  const startIndex = calculateStartIndex();
  const endIndex = Math.min(
    startIndex + maxVisibleButtons - 1,
    totalPagesCount
  );

  const buttons = [];

  for (let i = startIndex; i <= endIndex; i++) {
    buttons.push(
      <Button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? s.activePage : ""}
        variant="secondary"
      >
        {i}
      </Button>
    );
  }

  return <div className={s.buttonContainer}>{buttons}</div>;
};

export default PageButtons;
