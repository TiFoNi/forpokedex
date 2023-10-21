import React from "react";
import { Tab, Tabs, ButtonGroup, Button } from "react-bootstrap";
import s from "./TabsButtons.module.scss";

interface TabsButtonsProps {
  activeButtonIndex: number;
  isButtonsLocked: boolean;
  handleColumnsChange: (cols: number) => void;
  activeButtonIndexPCount: number;
  handlePokemonsCountChange: (Count: number) => void;
}

const TabsButtons: React.FC<TabsButtonsProps> = ({
  activeButtonIndex,
  isButtonsLocked,
  handleColumnsChange,
  activeButtonIndexPCount,
  handlePokemonsCountChange,
}) => {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
      style={{ marginTop: "1rem" }}
    >
      <Tab eventKey="home" title="К-ть в ряд">
        <ButtonGroup className={s.ButtonGroupStyle} aria-label="Basic example">
          <Button
            variant="secondary"
            onClick={() => handleColumnsChange(2)}
            className={activeButtonIndex === 2 ? s.activeButton : ""}
            disabled={isButtonsLocked}
          >
            2
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleColumnsChange(3)}
            className={activeButtonIndex === 3 ? s.activeButton : ""}
            disabled={isButtonsLocked}
          >
            3
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleColumnsChange(4)}
            className={activeButtonIndex === 4 ? s.activeButton : ""}
            disabled={isButtonsLocked}
          >
            4
          </Button>
        </ButtonGroup>
      </Tab>
      <Tab eventKey="profile" title="К-ть на сторінці">
        <ButtonGroup className={s.ButtonGroupStyle} aria-label="Basic example">
          <Button
            variant="secondary"
            onClick={() => handlePokemonsCountChange(10)}
            className={activeButtonIndexPCount === 10 ? s.activeButton : ""}
          >
            10
          </Button>
          <Button
            variant="secondary"
            onClick={() => handlePokemonsCountChange(20)}
            className={activeButtonIndexPCount === 20 ? s.activeButton : ""}
          >
            20
          </Button>
          <Button
            variant="secondary"
            onClick={() => handlePokemonsCountChange(50)}
            className={activeButtonIndexPCount === 50 ? s.activeButton : ""}
          >
            50
          </Button>
        </ButtonGroup>
      </Tab>
    </Tabs>
  );
};

export default TabsButtons;
