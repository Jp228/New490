from .models import Message

def insert_data(message_content):
    Message.objects.create(content=message_content)