# logic.py
from datetime import datetime
from zoneinfo import ZoneInfo
from geopy.geocoders import Nominatim
from timezonefinder import TimezoneFinder

geolocator = Nominatim(user_agent="jooba_interview_backend")
tf = TimezoneFinder()

def validate_time(value: str) -> datetime:
    try:
        return datetime.strptime(value, "%H:%M")
    except ValueError:
        raise ValueError("Time must be in HH:mm format")

def compare_time(time: datetime, place: str) -> bool:
    location = geolocator.geocode(place)
    if location:
        latitude = location.latitude
        longitude = location.longitude
        timezone_str = tf.timezone_at(lng=longitude, lat=latitude)

        if timezone_str:
            # current UTC time
            # TODO: check deprecated (it works tho)
            utc_now = datetime.utcnow().replace(tzinfo=ZoneInfo("UTC"))

            # Convert UTC time to local time
            local_time = utc_now.astimezone(ZoneInfo(timezone_str))
            print(f"Current time in {place}: {local_time.strftime('%H:%M')}")
            return time.hour == local_time.hour and time.minute == local_time.minute
        else:
            print(f"Timezone not found for {place}")
    else:
        print(f"Location for {place} not found")
