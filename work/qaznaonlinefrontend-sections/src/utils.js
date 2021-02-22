export const SERVER_URL = "http://95.56.233.237";
export const TOKEN_NAZIM = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg0NDQ0NzMsIm5iZiI6MTYwODQ0NDQ3MywianRpIjoiZjA5ZmU2ODctOTRkMy00NTc5LTg5YTMtODI3Y2JhZDZhMTE3IiwiZXhwIjoxNjA5MzA4NDczLCJpZGVudGl0eSI6MiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.8SwqLMEthVQdgndXFoJ8sqWAtM-ArOrG0FByp6sg9zA";

export const generateLocationPOSTData = ({ level, value, parentId, latitude, longitude }) => {
  let data;
  switch (level) {
    case 1: {
      data = {
        area1_name: value,
        coordinate: `[${latitude}, ${longitude}]`,
        area_id: parentId
      };
      break;
    }
    case 2: {
      data = {
        area2_name: value,
        coordinate: `[${latitude}, ${longitude}]`,
        area1_id: parentId
      };
      break;
    }
    default: {
      data = {
        area_name: value,
        coordinate: `[${latitude}, ${longitude}]`,
      };
    }
  }

  return data;
};

export const generateLocationPUTData = ({ level, value, parentId, latitude, longitude }) => {
  let data;
  switch (level) {
    case 1: {
      data = {
        area1_name: value,
        coordinate: `[${latitude}, ${longitude}]`,
        area_id: parentId,
        location_type: 1
      };
      break;
    }
    case 2: {
      data = {
        area2_name: value,
        coordinate: `[${latitude}, ${longitude}]`,
        area1_id: parentId,
        location_type: 2
      };
      break;
    }
    default: {
      data = {
        area_name: value,
        coordinate: `[${latitude}, ${longitude}]`,
        location_type: 0
      };
    }
  }

  return data;
};

export const generateSectionPOSTData = ({ level, valueKK, valueRU, parentId }) => {
  //console.log(level);
  let data;
  switch (level) {
    case 1: {
      data = {
        section_name_kk: valueKK,
        section_name_ru: valueRU,
        sections_id: parentId
      };
      break;
    }
    case 2: {
      data = {
        section_name_kk: valueKK,
        section_name_ru: valueRU,
        sections_id: parentId
      };
      break;
    }
    default: {
      data = {
        section_name_kk: valueKK,
        section_name_ru: valueRU,
        sections_id: parentId
      };
    }
  }

  return data;
};

export const generateSectionPUTData = ({ level, valueKK, valueRU, parentId }) => {
  //console.log(level);
  let data;
  switch (level) {
    case 0: {
      data = {
        section_name_kk: valueKK,
        section_name_ru: valueRU,
        sections_id: parentId,
        section_type: 0
      };
      break;
    }
    case 1: {
      data = {
        section_name_kk: valueKK,
        section_name_ru: valueRU,
        sections_id: parentId,
        section_type: 1
      };
      break;
    }
    default: {
      data = {
        section_name_kk: valueKK,
        section_name_ru: valueRU,
        sections_id: parentId,
        section_type: 0
      };
    }
  }

  return data;
};

