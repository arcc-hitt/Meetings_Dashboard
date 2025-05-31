from rest_framework import serializers
from .models import Meeting

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ['id', 'agenda', 'status', 'date_of_meeting', 'start_time', 'meeting_url']
