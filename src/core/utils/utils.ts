import { type TeamsOptions, type Option } from 'core/models/input.model';
interface CityStateZipShortName {
  city: string
  state: string
  zipCode: string
  county: string
  shortName: string
  shownAddress: string

}
export function getLocationInfo (
  address: google.maps.places.PlaceResult | undefined
): CityStateZipShortName {
  const addressInfo: CityStateZipShortName = {
    city: '',
    state: '',
    zipCode: '',
    shortName: '',
    county: '',
    shownAddress: address?.formatted_address ?? ''
  };

  const mailingAddress: string[] = [];
  if (address === undefined) {
    return addressInfo;
  }
  if (address.address_components === undefined) {
    return addressInfo;
  }
  const addressComponents = address.address_components;
  if (addressComponents === undefined) {
    return addressInfo;
  }
  addressComponents.forEach((addressComponent) => {
    switch (addressComponent.types[0]) {
      case 'route':
        mailingAddress.push(addressComponent.short_name);
        break;
      case 'neighborhood':
        mailingAddress.push(addressComponent.short_name);
        break;
      case 'locality':
        addressInfo.city = addressComponent.long_name;
        break;
      case 'administrative_area_level_1':
        addressInfo.state = addressComponent.long_name;
        break;
      case 'administrative_area_level_2':
        addressInfo.county = addressComponent.long_name;
        break;
      case 'postal_code':
        addressInfo.zipCode = addressComponent.long_name;
        break;
      case 'street_number':
        mailingAddress.push(addressComponent.short_name);
        break;
    }
  });

  const shortMailingAddress = mailingAddress.join(', ');
  addressInfo.shortName = shortMailingAddress;

  return addressInfo;
};

export function compareArrays<T = string> (arrA: T[], arrB: T[], key?: keyof T, returnDif: boolean = false): boolean | {
  same: boolean
  difB: T[]
  difA: T[]
} {
  if (arrA.length !== arrB.length) {
    return false;
  }
  if (key !== undefined) {
    const arrayAIds = arrA.map(item => item[key] as any);
    const arrayBIds = arrB.map(item => item[key] as any);
    if (returnDif) {
      const difA = arrA.filter((item) => !arrayBIds.includes(item[key])) ?? [];
      const difB = arrB.filter((item) => !arrayAIds.includes(item[key])) ?? [];
      return {
        same: arrayAIds.every((id, index) => id === arrayBIds[index]),
        difA,
        difB
      };
    }
    return arrayAIds.every((id, index) => id === arrayBIds[index]);
  };
  return arrA.toString() === arrB.toString();
};

export function setImperialLabels (labelType: string, labelValue: string): string {
  if (labelType === 'height') {
    return `${labelValue}Ft`;
  }
  if (labelType === 'weight') {
    return `${labelValue}Lbs`;
  }
  return labelValue;
};

/**
 * Converts an all caps string to an Option object with a label and value.
 * @param allCapString - The input string in all caps.
 * @param namingConvention - The naming convention to apply to the label. Defaults to 'FirstUpperCase'.
 * @returns An Option object with a value and label.
 */
export function AllCaptoOption (
  allCapString: string | number, namingConvention: 'FirstUpperCase' | 'LastUpperCase' = 'FirstUpperCase', optionalLabel: string = ''
): Option {
  if (typeof allCapString === 'number') {
    return {
      value: allCapString.toString(),
      label: `${allCapString.toString()} ${optionalLabel}`
    };
  }
  let labelValue = `${allCapString.charAt(0)}${allCapString.slice(1).toLowerCase()}`;
  labelValue = labelValue.split('_').join(' ');
  if (namingConvention === 'LastUpperCase') {
    labelValue = labelValue.slice(0, -1) + labelValue.slice(-1).toUpperCase();
  }
  return {
    value: allCapString,
    label: `${labelValue} ${optionalLabel}`
  };
};

export function AllCapStrToReadableStr (allCapStr?: string | null): string {
  if (allCapStr === undefined || allCapStr === null) {
    return '';
  }
  const labelValue = `${allCapStr.charAt(0)}${allCapStr.slice(1).toLowerCase()}`;
  return labelValue.split('_').join(' ');
};

export function getAgeFromDate (birthDate?: Date | string | null): string {
  if (birthDate === undefined || birthDate === null) {
    return '';
  }
  const today = new Date();
  const dateToCalculate = birthDate instanceof Date ? birthDate : new Date(birthDate);
  let age = today.getFullYear() - dateToCalculate.getFullYear();
  const m = today.getMonth() - dateToCalculate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dateToCalculate.getDate())) {
    age--;
  };
  return `${age}`;
};

export function ftToCm (ft: string): number | undefined {
  if (ft === undefined || ft === '') {
    return undefined;
  };
  const [feet, inches] = ft.split('\'');
  const inchesNotNull = (Number(inches.slice(0, -1)));
  const cmTotal = (Number(feet) * 30.48) + (inchesNotNull * 2.54);

  return Number(cmTotal.toFixed(2));
};

export function cmToFtInches (cm?: number | null): string {
  if (cm === 0 || cm === null || cm === undefined) {
    return '';
  };
  let feet = cm / 30.48;
  let inches = (feet % 1) * 12;

  if (~~inches >= 12) {
    inches = 0;
    feet = ~~feet + 1;
  }

  return `${~~feet}'${~~inches}"`;
};

export const minMaxWeight = (value: number | string): boolean | string => {
  const numberedValue = Number(value);
  if (isNaN(numberedValue)) {
    return true;
  };
  if (value.toString() === '') {
    return true;
  }

  if (numberedValue > 400 || numberedValue < 100) {
    return 'Weight must be between 100 & 400 Lbs';
  };
  return true;
};

export const validateMinAge = (value: string): boolean | string => {
  const age = getAgeFromDate(value);
  if (Number(age) > 18 && Number(age) < 70) {
    return true;
  };

  return 'Age should be between 18 and 70 years';
};

/**
 * Get Initials from a Name
 * @function Takes Only fullName or Firstname & lastName params.
 * @Example getInitials('John Fitzgerald Kennedy') return "JFK"l
 * @param {string | undefined} fullName - full name, should have space between
 * first name, middle name and last name.
 * @param {string | undefined} firstName - First name.
 * @param {string | undefined} lastName - Last name.
 * @returns {string} Initials
 * */
export function getInitials (fullName?: string, firstName?: string, lastName?: string): string {
  if (fullName !== undefined) {
    return fullName.split(' ').map((e) => e.charAt(0).toUpperCase()).join('').replace(/\s/g, '');
  }

  return [firstName, lastName].map((e) => e?.charAt(0).toUpperCase()).join('').replace(/\s/g, '');
}

/**
 * Formats a given date into a string representation.
 * @param date - The date to be formatted.
 * @returns The formatted date string ("Dec 23, 2023").
 */
export function formatDate (
  date?: Date | null,
  options: any = { month: 'short', day: 'numeric', year: 'numeric' },
  locale: string = 'en-US',
  dayPrefix: boolean = false
): string {
  if (date === undefined || date === null) return '';
  const initialDate = new Date(date);
  if (dayPrefix) {
    return addDayPrefix(initialDate.toLocaleDateString(locale, options));
  }
  return initialDate?.toLocaleDateString(locale, options);
};

/**
 * Formats the given time value into a string representation based on the provided options and language.
 *
 * @param time - The time value to be formatted. Can be a Date object, a string representing a date, or null.
 * @param options - The formatting options for the time output. Defaults to { hour: '2-digit', minute: '2-digit' }.
 * @param lang - The language code for the locale to be used in formatting. Defaults to 'en-US'.
 * @returns A string representation of the formatted time value.
 */
export function formatTime (time?: Date | null | string, options: any = { hour: '2-digit', minute: '2-digit' }, lang: string = 'en-US'): string {
  if (time === undefined || time === null) return '';

  if (typeof time === 'string') {
    const [hours, minutes] = time.split(':').map(Number);
    const parsedDate = new Date();
    parsedDate.setHours(hours);
    parsedDate.setMinutes(minutes);

    return parsedDate.toLocaleTimeString(lang, options);
  };

  return time?.toLocaleTimeString(lang, options);
}

function addDayPrefix (date: string): string {
  let [day, month] = date.split(' ');

  switch (day.slice(-1)) {
    case '1':
      day += 'st';
      break;
    case '2':
      day += 'nd';
      break;
    case '3':
      day += 'rd';
      break;
    default:
      day += 'th';
  }

  return `${day} ${month}`;
}

export function splitArrayIntoChunks<T> (array: T[], chunkSize: number = 2, arbitarySize?: number): T[][] {
  let size = Math.ceil(array.length / chunkSize);

  if (arbitarySize !== undefined) {
    size = arbitarySize;
  };

  return Array.from({ length: chunkSize }, (v, i) =>
    array.slice(i * size, i * size + size)
  );
};

export function sortTeamsListDependingOnOgTeamsList (teamsList: Array<Option<TeamsOptions>>, OgTeamsList?: Array<Option<TeamsOptions>>): Array<Option<TeamsOptions>> {
  if (OgTeamsList === undefined) return teamsList;

  const idToIndexMap = new Map<string, number>();
  OgTeamsList.forEach((team, index) => {
    idToIndexMap.set(team.value, index);
  });
  return teamsList.sort((a, b) => {
    const indexA = idToIndexMap.get(a.value);
    const indexB = idToIndexMap.get(b.value);

    // If either ID is not found in OgTeamsList, keep their relative order
    if (indexA === undefined || indexB === undefined) {
      return 0;
    }

    return indexA - indexB;
  });
}
export function getTournamentRuleVariableType (variable: any): number | string | Date | any[] {
  if (typeof variable === 'string') {
    return variable;
  } else if (typeof variable === 'number') {
    return variable;
  } else if (variable instanceof Date) {
    return variable;
  } else if (Array.isArray(variable)) {
    return variable;
  } else {
    return variable;
  }
}

export function combineDateAndTime (time: string | Date | null, date: Date | null): string | null {
  if (time === '') {
    return null;
  }
  if (typeof time === 'string') {
    const [hours, minutes] = time.split(':').map(Number);
    const parsedDate = new Date(date ?? '');
    parsedDate.setHours(hours, minutes, 0, 0);

    return parsedDate.toISOString();
  }

  return null;
}
export function splitDateTime (date?: string): { date: Date, time: string } {
  if (date === null) {
    return { date: new Date(), time: '' };
  }

  if (date === undefined) {
    return { date: new Date(), time: '' };
  }

  const dateObj = new Date(date);
  // Extract the time components
  const hours = dateObj.getHours();
  let minutes = dateObj.getMinutes().toString();

  if (minutes.length === 1) {
    minutes = `${minutes}0`;
  }

  // Create the time string
  const time = `${hours}:${minutes}`;

  // Create a new Date object with the same date but time set to 00:00:00
  const dateOnly = new Date(date);
  dateOnly.setHours(0, 0, 0, 0);
  return { date: dateOnly, time };
}

/**
 * Creates an abbreviation from a group name.
 * e.g., "Quarter Finals" becomes "QF".
 */
export const abbreviateGroupName = (name: string = ''): string => {
  if (!name) return '';
  const words = name.split('-');
  if (words.length === 1) return name;
  return words.filter(Boolean).map(word => word[0]).join('').toUpperCase();
};

export const fmt = (s?: string, e?: string): string => (s && e) ? `${s}-${e}` : '';
