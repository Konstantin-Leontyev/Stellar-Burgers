import React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";

import { BurgerDetailsCard } from "../burger-details-card";
import { Modal } from '../../../modal';


export function BurgerDetails(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const { number } = useParams();
  const state = location.state;

  function onClose() {
    navigate(state.backgroundLocation.pathname);
  }

  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <BurgerDetailsCard />
    </Modal>
  );
}