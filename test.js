import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CEComponent from './CEComponent';

describe('CEComponent', () => {
    const mockProps = {
        ceNumNodes: 10,
        ceNumClusters: 2,
        ceCrit: 1,
        ceSizeNodes: 3,
        ceBootDiskSize: 2,
        handleCeNumNodesChange: jest.fn(),
        handleNumClustersChange: jest.fn(),
        handleCritChange: jest.fn(),
        handleSizeNodesChange: jest.fn(),
        handleBootDiskSizeChange: jest.fn(),
    };

    test('renders CEComponent with correct initial values', () => {
        render(<CEComponent {...mockProps} />);

        expect(screen.getByLabelText(/Number of Nodes:/).value).toBe('10');
        expect(screen.getByLabelText(/Criticality:/).value).toBe('1');
        expect(screen.getByLabelText(/Number of Clusters:/).value).toBe('2');
        expect(screen.getByLabelText(/Size of Nodes:/).value).toBe('3');
        expect(screen.getByLabelText(/Boot Disk Size:/).value).toBe('2');
    });

    test('calls handleCeNumNodesChange when Number of Nodes changes', () => {
        render(<CEComponent {...mockProps} />);
        const input = screen.getByLabelText(/Number of Nodes:/);
        fireEvent.change(input, { target: { value: '20' } });
        expect(mockProps.handleCeNumNodesChange).toHaveBeenCalled();
    });

    test('calls handleCritChange when Criticality changes', () => {
        render(<CEComponent {...mockProps} />);
        const select = screen.getByLabelText(/Criticality:/);
        fireEvent.change(select, { target: { value: '2' } });
        expect(mockProps.handleCritChange).toHaveBeenCalled();
    });

    test('calls handleNumClustersChange when Number of Clusters changes', () => {
        render(<CEComponent {...mockProps} />);
        const input = screen.getByLabelText(/Number of Clusters:/);
        fireEvent.change(input, { target: { value: '3' } });
        expect(mockProps.handleNumClustersChange).toHaveBeenCalled();
    });

    test('calls handleSizeNodesChange when Size of Nodes changes', () => {
        render(<CEComponent {...mockProps} />);
        const select = screen.getByLabelText(/Size of Nodes:/);
        fireEvent.change(select, { target: { value: '4' } });
        expect(mockProps.handleSizeNodesChange).toHaveBeenCalled();
    });

    test('calls handleBootDiskSizeChange when Boot Disk Size changes', () => {
        render(<CEComponent {...mockProps} />);
        const select = screen.getByLabelText(/Boot Disk Size:/);
        fireEvent.change(select, { target: { value: '3' } });
        expect(mockProps.handleBootDiskSizeChange).toHaveBeenCalled();
    });

    test('CustomInput has correct blockedMin value', () => {
        render(<CEComponent {...mockProps} />);
        const input = screen.getByLabelText(/Number of Nodes:/);
        expect(input).toHaveAttribute('blockedMin', '1');
    });
});
