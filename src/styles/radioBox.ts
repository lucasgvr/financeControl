import styled from 'styled-components'

import { darken, transparentize } from 'polished'

export const TransactionTypeContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`

type RadioBoxProps = {
    $isActive: boolean
    $activeColor: 'green' | 'red'
}

const colors = {
    green: '#6B9080',
    red: '#F05D5E'
}

export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;

    background: ${(props) => props.$isActive 
        ? transparentize(0.6, colors[props.$activeColor])
        : 'transparent'
    };

    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;

    &:hover {
        border-color: ${darken(0.1, '#d7d7d7')};
    }

    img {
        width: 20px;
        height: 20px;
    }

    span {
        display: inline-block;
        font-size: 1rem;
        color: var(--text-title);
    }
`