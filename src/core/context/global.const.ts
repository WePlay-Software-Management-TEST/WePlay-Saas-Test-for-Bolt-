import { type Option } from 'core/models/input.model';
import { type ClassNamesConfig } from 'react-select';

export const businessSizeOption: Option[] = [
  {
    value: '1-5',
    label: '1-5 Employees'
  },
  {
    value: '6-20',
    label: '6-20 Employees'
  },
  {
    value: '21-50',
    label: '21-50 Employees'
  },
  {
    value: '51-99',
    label: '51-99 Employees'
  },
  {
    value: '100+',
    label: '100+ Employees'
  }
];
// 250KB min image size
export const minImageSize = 250000;

// 10MB max image size
export const maxImageSize = 10000000;

export const acceptedFileType = ['png', 'jpeg', 'jpg'];

export const PageSizes: Option[] = [
  {
    label: '15',
    value: '15'
  },
  {
    label: '30',
    value: '30'
  },
  {
    label: '50',
    value: '50'
  }
];

export const heightOptions: Option[] = [
  { value: '3\'0"', label: '3\' 0"' },
  { value: '3\'1"', label: '3\' 1"' },
  { value: '3\'2"', label: '3\' 2"' },
  { value: '3\'3"', label: '3\' 3"' },
  { value: '3\'4"', label: '3\' 4"' },
  { value: '3\'5"', label: '3\' 5"' },
  { value: '3\'6"', label: '3\' 6"' },
  { value: '3\'7"', label: '3\' 7"' },
  { value: '3\'8"', label: '3\' 8"' },
  { value: '3\'9"', label: '3\' 9"' },
  { value: '3\'10"', label: '3\' 10"' },
  { value: '3\'11"', label: '3\' 11"' },
  { value: '4\'0"', label: '4\' 0"' },
  { value: '4\'1"', label: '4\' 1"' },
  { value: '4\'2"', label: '4\' 2"' },
  { value: '4\'3"', label: '4\' 3"' },
  { value: '4\'4"', label: '4\' 4"' },
  { value: '4\'5"', label: '4\' 5"' },
  { value: '4\'6"', label: '4\' 6"' },
  { value: '4\'7"', label: '4\' 7"' },
  { value: '4\'8"', label: '4\' 8"' },
  { value: '4\'9"', label: '4\' 9"' },
  { value: '4\'10"', label: '4\' 10"' },
  { value: '4\'11"', label: '4\' 11"' },
  { value: '5\'0"', label: '5\' 0"' },
  { value: '5\'1"', label: '5\' 1"' },
  { value: '5\'2"', label: '5\' 2"' },
  { value: '5\'3"', label: '5\' 3"' },
  { value: '5\'4"', label: '5\' 4"' },
  { value: '5\'5"', label: '5\' 5"' },
  { value: '5\'6"', label: '5\' 6"' },
  { value: '5\'7"', label: '5\' 7"' },
  { value: '5\'8"', label: '5\' 8"' },
  { value: '5\'9"', label: '5\' 9"' },
  { value: '5\'10"', label: '5\' 10"' },
  { value: '5\'11"', label: '5\' 11"' },
  { value: '6\'0"', label: '6\' 0"' },
  { value: '6\'1"', label: '6\' 1"' },
  { value: '6\'2"', label: '6\' 2"' },
  { value: '6\'3"', label: '6\' 3"' },
  { value: '6\'4"', label: '6\' 4"' },
  { value: '6\'5"', label: '6\' 5"' },
  { value: '6\'6"', label: '6\' 6"' },
  { value: '6\'7"', label: '6\' 7"' },
  { value: '6\'8"', label: '6\' 8"' },
  { value: '6\'9"', label: '6\' 9"' },
  { value: '6\'10"', label: '6\' 10"' },
  { value: '6\'11"', label: '6\' 11"' },
  { value: '7\'0"', label: '7\' 0"' },
  { value: '7\'1"', label: '7\' 1"' },
  { value: '7\'2"', label: '7\' 2"' },
  { value: '7\'3"', label: '7\' 3"' },
  { value: '7\'4"', label: '7\' 4"' },
  { value: '7\'5"', label: '7\' 5"' },
  { value: '7\'6"', label: '7\' 6"' },
  { value: '7\'7"', label: '7\' 7"' },
  { value: '7\'8"', label: '7\' 8"' },
  { value: '7\'9"', label: '7\' 9"' },
  { value: '7\'10"', label: '7\' 10"' },
  { value: '7\'11"', label: '7\' 11"' }
];

export const YearsOfExperienceOptions: Option[] = [
  { value: '1-3', label: '1 - 3 Years' },
  { value: '3-6', label: '3 - 6 Years' },
  { value: '6-10', label: '6 - 10 Years' },
  { value: '10+', label: '10+ Years' }
];

export const listOfStates = [
  ['Arizona', 'AZ'],
  ['Alabama', 'AL'],
  ['Alaska', 'AK'],
  ['Arkansas', 'AR'],
  ['California', 'CA'],
  ['Colorado', 'CO'],
  ['Connecticut', 'CT'],
  ['Delaware', 'DE'],
  ['Florida', 'FL'],
  ['Georgia', 'GA'],
  ['Hawaii', 'HI'],
  ['Idaho', 'ID'],
  ['Illinois', 'IL'],
  ['Indiana', 'IN'],
  ['Iowa', 'IA'],
  ['Kansas', 'KS'],
  ['Kentucky', 'KY'],
  ['Louisiana', 'LA'],
  ['Maine', 'ME'],
  ['Maryland', 'MD'],
  ['Massachusetts', 'MA'],
  ['Michigan', 'MI'],
  ['Minnesota', 'MN'],
  ['Mississippi', 'MS'],
  ['Missouri', 'MO'],
  ['Montana', 'MT'],
  ['Nebraska', 'NE'],
  ['Nevada', 'NV'],
  ['New Hampshire', 'NH'],
  ['New Jersey', 'NJ'],
  ['New Mexico', 'NM'],
  ['New York', 'NY'],
  ['North Carolina', 'NC'],
  ['North Dakota', 'ND'],
  ['Ohio', 'OH'],
  ['Oklahoma', 'OK'],
  ['Oregon', 'OR'],
  ['Pennsylvania', 'PA'],
  ['Rhode Island', 'RI'],
  ['South Carolina', 'SC'],
  ['South Dakota', 'SD'],
  ['Tennessee', 'TN'],
  ['Texas', 'TX'],
  ['Utah', 'UT'],
  ['Vermont', 'VT'],
  ['Virginia', 'VA'],
  ['Washington', 'WA'],
  ['West Virginia', 'WV'],
  ['Wisconsin', 'WI'],
  ['Wyoming', 'WY']
];

export function abbrState (input: string, to: 'abbr' | 'name' = 'abbr'): string {
  if (to === 'abbr') {
    input = input.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    for (let i = 0; i < listOfStates.length; i++) {
      if (listOfStates[i][0] === input) {
        return (listOfStates[i][1]);
      }
    }
  }
  input = input.toUpperCase();
  for (let i = 0; i < listOfStates.length; i++) {
    if (listOfStates[i][1] === input) {
      return (listOfStates[i][0]);
    }
  }

  return '';
};

export const defaultCitites = [
  {
    label: 'Henderson, Nevada',
    value: 'Henderson, Nevada'
  },
  {
    label: 'Hendersonville, North Carolina',
    value: 'Hendersonville, North Carolina'
  },
  {
    label: 'Hendersonville, Tennessee',
    value: 'Hendersonville, Tennessee'
  },
  {
    label: 'Henderson, North Carolina',
    value: 'Henderson, North Carolina'
  },
  {
    label: 'Henderson, Texas',
    value: 'Henderson, Texas'
  }
];

export const alphabetArray = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'];
/**
 * Returns the default class names configuration for React-Select.
 * @template T - The type of the option value.
 * @param menuPlacement - The placement of the menu (top, bottom, auto).
 * @param cyData - The data for Cypress automation.
 * @returns The class names configuration object.
 */
export function getDefaultClassNameStylesReactSelect<T> (
  menuPlacement: 'top' | 'bottom' | 'auto',
  cyData: string
): ClassNamesConfig<Option<T>> {
  return {
    control: () => '!border-grey-90 !rounded-lg m-3 mobile:m-0 mobile:h-[40px] mobile:!border-grey-40',
    container: () => 'w-full',
    valueContainer: () => '!px-0 !overflow-visible rounded-md outline-double outline-2 outline-grey-90 mobile:border-none mobile:outline-none !flex mobile:h-[40px] gap-2',
    indicatorSeparator: () => 'hidden',
    dropdownIndicator: () => 'hidden',
    indicatorsContainer: () => '!hidden',
    placeholder: () => 'body-xs-text text-grey-40',
    menu: () => `${menuPlacement === 'top' ? '!mb-0' : '!mt-2'} -ml-0 mr-0 mobile:!pl-4 !shadow-none mobile:bg-transparent
   mobile:fixed mobile:w-full mobile:-ml-[50px]`,
    menuList: () => `menuList !border-0 overflow-y-scroll average:!max-h-[500px] short:!max-h-[400px]
   !max-h-[250px] mobile:!max-h-[calc(100vh-145px)] mobile:bg-transparent mobile:gap-2 mobile:flex mobile:flex-col mobile:pr-2`,
    multiValueRemove: () => 'peer-focus-within:!bg-blue-60 peer-focus-within:!stroke-white',
    multiValueLabel: () => 'peer',
    singleValue: () => '',
    input: () => `cypressAutoComplete text-sm font-light text-grey-40 !py-2 mobile:h-[40px] !-mr-4 ${cyData}`
  };
};
export const defaultCounties = [
  {
    label: 'Henderson County, Texas',
    value: 'Henderson County, Texas'
  },
  {
    label: 'Henderson County, North Carolina',
    value: 'Henderson County, North Carolina'
  },
  {
    label: 'Henderson County, Kentucky',
    value: 'Henderson County, Kentucky'
  },
  {
    label: 'Henderson County, Tennessee',
    value: 'Henderson County, Tennessee'
  },
  {
    label: 'Henderson County, Illinois, Illinois',
    value: 'Henderson County, Illinois, Illinois'
  }
];
