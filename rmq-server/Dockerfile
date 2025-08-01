# docker run -d --hostname rmq --name rabbit-server -p 8080:15672 -p 5672:5672 rabbitmq:3-management

# Use the official RabbitMQ image with management plugin
FROM rabbitmq:3-management

# Set the hostname
ENV RABBITMQ_NODENAME rmq

# Expose ports
EXPOSE 5672 15672

# Start RabbitMQ
CMD ["rabbitmq-server"]