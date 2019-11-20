export const transform = ({
  deletedFields = [],
}) => (
  (document, ret, options) => {
      ret.id = ret._id; // Copying of ID

      // Deletion of fields
      const fields = [...deletedFields, '_id', '__v', 'deleted'];
      fields.forEach(field => delete ret[field]);

      return ret;
  }
);
