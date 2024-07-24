import ReactDOM from "react-dom";
import styled from "styled-components";
import React, { useState } from "react";


const Message = () => {
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

    const openMessageModal = () => setIsMessageModalOpen(true);
    const closeMessageModal = () => setIsMessageModalOpen(false);


    return (
    <>
    <button onClick={openMessageModal}>Message</button>

    {isMessageModalOpen &&
    ReactDom.createPortal(
        <

    )}

    </>
    )
}

export default Message