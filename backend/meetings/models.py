from django.db import models

class Meeting(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('in_review', 'In Review'),
        ('cancelled', 'Cancelled'),
        ('overdue', 'Overdue'),
        ('published', 'Published'),
    ]

    agenda = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    date_of_meeting = models.DateField()
    start_time = models.TimeField()
    meeting_url = models.URLField(max_length=500)

    def __str__(self):
        return f"{self.agenda} on {self.date_of_meeting}"