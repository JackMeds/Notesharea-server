/** 
 * @description test demo
 */

function sum(a, b) {
    return a + b
}

test('10+20=30demo', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
    })