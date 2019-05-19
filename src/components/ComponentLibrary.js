import Preisliste from './SubComponents/Preisliste';
import Gericht from './SubComponents/Gericht';
import Image from './SubComponents/Image';
import Beschreibung from './SubComponents/Beschreibung';
import Aktion from './SubComponents/Aktion';

// This is a library wrapper module to make our components accesiable dynamically
export default {
    'priceList': Preisliste,
    'gericht': Gericht,
    'image': Image,
    'beschreibung': Beschreibung,
    'aktion': Aktion
}
