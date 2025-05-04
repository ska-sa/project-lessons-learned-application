import datetime
import typing

from pydantic import BaseModel
from pydantic_settings import BaseSettings

from src.utilities.formatters.datetime_formatter import format_datetime_into_isoformat
from src.utilities.formatters.field_formatter import format_dict_key_to_camel_case


class BaseSchemaModel(BaseModel):
    model_config = {
        "orm_mode": True,
        "validate_assignment": True,
        "populate_by_name": True,
        "json_encoders": {datetime.datetime: format_datetime_into_isoformat},
        "alias_generator": format_dict_key_to_camel_case,
    }