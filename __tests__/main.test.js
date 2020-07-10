import { wpJestTestsInit } from '../src/main';

afterEach( () => {
    jest.clearAllMocks();
} );

describe( 'Initialization', () => {
    test( 'if wpJestTests is undefined, nothing happens', () => {
        expect( wpJestTestsInit() ).toBe( false );
    } );
    
    test( 'if .entry-content is missing, nothing happens', () => {
        wpJestTests = { posts: 5 };
        const mockQuerySelector = jest.spyOn( document, 'querySelector' ) .mockImplementation( () => undefined );
        expect( wpJestTestsInit() ).toBe( false );
        expect( mockQuerySelector ).toHaveBeenCalledTimes( 1 );
    } );
} );

describe( 'Fetch posts', () => {
    beforeAll( () => {
        wpJestTests = { posts: 5 };
        global.fetch = jest.fn().mockImplementation(
            () => Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve( [
                    {
                        link: 'test-1',
                        title: { rendered: 'Post 1' }
                    },
                    {
                        link: 'test-2',
                        title: { rendered: 'Post 2' }
                    },
                    {
                        link: 'test-3',
                        title: { rendered: 'Post 3' }
                    },
                    {
                        link: 'test-4',
                        title: { rendered: 'Post 4' }
                    },
                    {
                        link: 'test-5',
                        title: { rendered: 'Post 5' }
                    },
                ] ),
            })
        );
    } );

    afterAll( () => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    test( 'if button is clicked, posts are fetch and inserted', done => {
        const mockClassListAdd = jest.fn();
        const mockRemoveChild = jest.fn();
        const events = {};
        const divElem = {
            classList: { add: mockClassListAdd },
            innerHTML: '',
            insertAdjacentHTML: () => {},
            addEventListener: jest.fn( ( eventName, callback ) => {
                events[ eventName ] = callback;
            } ),
            dispatchEvent: jest.fn( eventName => {
                events[ eventName ]();
            } ),
            parentNode: {
                removeChild: mockRemoveChild
            }
        };
        const mockQuerySelector = jest.spyOn( document, 'querySelector') .mockImplementation( () => divElem );

        expect( wpJestTestsInit() ).toBe( true );
        divElem.dispatchEvent( 'click' );

        process.nextTick(() => {
            expect( mockQuerySelector ).toHaveBeenCalledTimes( 2 );
            expect( mockQuerySelector ).toHaveBeenCalledWith( '.entry-content' );
            expect( mockQuerySelector ).toHaveBeenCalledWith( '#load-posts' );
            expect( global.fetch ).toHaveBeenCalledTimes( 1 );
            expect( mockClassListAdd ).toHaveBeenCalledTimes( 1 );
            expect( mockRemoveChild ).toHaveBeenCalledTimes( 1 );
            expect( divElem.innerHTML.match( /test-[1-5]/g ).length ).toBe( 5 );

            done();
        });
    } );
} );
