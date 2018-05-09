const K_WIDTH = 16;
const K_HEIGHT = 16;

const PharmacyMarkerTrainingStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '1px solid #000000',
    borderRadius: K_HEIGHT,
    backgroundColor: '#36E7F4',
    textAlign: 'center',
    color: '#0000cc',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 4
};

const PharmacyMarkerNoTrainingStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '1px solid #000000',
    borderRadius: K_HEIGHT,
    backgroundColor: '#AA2E25',
    textAlign: 'center',
    color: '#FF99FF',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 4
};

export {PharmacyMarkerTrainingStyle, PharmacyMarkerNoTrainingStyle};