## mongo express on kubernetes

### prerequisites:
make sure minikube and kubectl is installed.

''''
pip install minikube
''''

 will install minikube with kubectl.
# 1. start:
 ''''
 minikube start
 ''''
will start the cluster.

''''
kubectl get all -o wide
''''
will display current components in cluster

# 2. create namespace:
''''
kubectl apply -f mongo-namespace.yaml 
''''
to create namespace, which is like a virtuel cluster
called mongodb-namedspace

''''
kubectl delete mongo-namespace.yaml
''''
to delete the namespace

''''
kubectl get ns
''''
to see namespace in cluster

# 3. create4 the secret:
''''
kubectl apply -f mongo-secret.yaml
''''
to apply the secret called mongodb-secret. this can be vire with get or deleteted with delete

# 4. create deployment to manage pods and replicas. 
The mongo.yaml deployment manages pods and services which contains of mongoDB pod which wil use username and password from secret as the database credentials. The mongo service is internal, which is inaccessable for outside the cluster. The service functions to enable other pods within the cluster to communicate with mongodb pod.

to apply deployment:
''''
kubectl apply -f mongo.yaml
''''

to delete de+p+loyment:
''''
kubectl delete -f mongo.yaml
''''

To list all services in namespace:
''''
kubectl get svc -n mongodb-namespace
''''
To list all deployments:
''''
kubectl get deploy -n mongodb-namespace 
''''
to list all reploicas_
''''
kubectl get rs -n mongodb-namespace
''''
to see all stuff in overview, wide:
''''
kubectl get all -o wide
''''

# 5. create config map:
''''
kubectl apply -f mongodb-configmap.yaml
''''


''''
kubectl get cm -n mongodb-namespaced
''''

# 6. create mongo express service and deployment

mongo-express is a web based interface to manage mongoDB databases. It uses the username and password from secret and the dayabase url from configmap to access internal mongodb service defined in point 4. the service from express. if its an external service, it will allow external rfequest to communicate with the pods in 6. But, ingress will be defined inpoint 7, this service will be an internal service, which woukd define the policy to access the mongoexpress pod.



''''
kubectl apply -f mongo-express.yaml
''''
# 7. ingress routing:
ingress re4souce defines the rules on trafficing with the ingress controller ( k8 NGINX) which manages external access to services in a cluster. 


 Create an Ingress resource, which defines rules on traffic routing, and an Ingress Controller (K8 Nginx), which manages external access to Services in a cluster. An external proxy server could be used to manage access to various clusters. Change the /etc/hosts file to map the host url stated in mongo-ingress.yml to the IP address of the Ingress Controller. Commented TLS key is used to enable HTTPS.

 ''''
minikube addons
''''
enable ingress to automatically start the K8s Nginx implementation of Ingress Controller.

''''
kubectl get po -n kube-system 
''''

to verify the creation of the pod ingress-nginx-controller.

''''
kubectl apply -f mongo-ingress.yml
''''
to create the Ingress called mongodb-ingress.

''''
kubectl delete -f mongo-ingress.yml
''''
 to delete the Ingress.

''''
kubectl get ing -n mongodb-namespace
''''
to list all Ingresses.


