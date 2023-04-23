import Ship from './Ship'
const ship = new Ship('patrol')

test('ship type', () => {
    expect(ship.type).toBe('patrol')
})

test('ship length', () => {
    expect(ship.length).toBe(2)
});

test('ship hits', () => {
    expect(ship.hits.length).toBe(0)
});

test('ship isSunk', () => {
    expect(ship.isSunk()).toBe(false)
});