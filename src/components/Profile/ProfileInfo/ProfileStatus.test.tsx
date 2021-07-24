import React from 'react';
import {create} from 'react-test-renderer';
import {ProfileStatus} from "./ProfileStatus";


describe('Profile status component', () => {
    test('status from props shoud be in the state', () => {
        const component = create(<ProfileStatus status={'test profile status'}
                                                updateUserStatus={(status: string) => {}}/>)
        const instance = component.getInstance();
        //@ts-ignore
        expect(instance.state.status).toBe('test profile status')
    });

    test('after creation span should be displayed ', () => {
        const component = create(<ProfileStatus status={'test profile status'}
                                                updateUserStatus={(status: string) => {}}/>)
        const root = component.root;
        //@ts-ignore
        const span = root.findByType('span');
        //@ts-ignore
        expect(span).toBeDefined()
    });

    test('after creation span should be displayed with correct status', () => {
        const component = create(<ProfileStatus status={'test profile status'}
                                                updateUserStatus={(status: string) => {}}/>)
        const root = component.root;
        //@ts-ignore
        const span = root.findByType('span');
        //@ts-ignore
        expect(span.children[0]).toBe('test profile status')
    });

    test("after creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={'test profile status'}
                                                updateUserStatus={(status: string) => {}}/>)
        const root = component.root;
        //@ts-ignore
        expect(() => {
            //@ts-ignore
            const input = root.findByType('input');
        }).toThrow();
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={'test profile status'}
                                                updateUserStatus={(status: string) => {}}/>)
        const root = component.root;
        //@ts-ignore
        const span = root.findByType('span');
        //@ts-ignore
        span.props.onDoubleClick();
        //@ts-ignore
        const input = root.findByType('input');
        expect(input.props.value).toBe('test profile status')
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={'test profile status'}
                                                updateUserStatus={mockCallback}/>)
        const instance = component.getInstance();
        //@ts-ignore
        instance.deactivateEditMode()
        //@ts-ignore
        expect(mockCallback.mock.calls.length).toBe(1)
    });
})