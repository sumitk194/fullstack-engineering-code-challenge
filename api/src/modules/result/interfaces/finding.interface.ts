import { Document } from 'mongoose';

export interface findings extends Document{
  findings:
    {
      type:String,
      rule_id:String,
      location:
      {
        path:String,
        positions:
        {
          begin :
          {
            line :Number,
          }
        }
      },
      metadata:
      {
        description:String,
        severity:String,
      },
    }
}

