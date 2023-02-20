import styled from "styled-components";

export const Container = styled.button`
    width: 100%;
    height: 56px;

    background-color: ${({ theme }) => theme.COLORS.ORANGE};

    color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    font-weight: 500;

    margin-top: 16px;
    padding: 0 16px;
    
    border: none;
    border-radius: 10px;
    
    &:disabled {
        opacity: 0.5;
    }
`;