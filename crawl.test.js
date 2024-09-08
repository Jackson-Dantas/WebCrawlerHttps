const {normalizeURL} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip Protocol', () =>{
    const input= 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected); 
})

test('normalizeURL string trailing slash', () =>{
    const input= 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected); 
})

test('normalizeURL capitals', () =>{
    const input= 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected); 
})

test('normalizeURL Strip HTTP', () =>{
    const input= 'http://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected); 
})