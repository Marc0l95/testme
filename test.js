apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: coredns-checker
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: coredns-checker
  template:
    metadata:
      labels:
        app: coredns-checker
    spec:
      containers:
        - name: dns-checker
          image: alpine:latest
          imagePullPolicy: IfNotPresent
          command: ["/bin/sh", "-c"]
          args:
            - |
              apk add --no-cache bind-tools > /dev/null 2>&1
              while true; do
                TIMESTAMP=$(date -Iseconds)
                NODE_NAME=$(cat /etc/hostname)
                check_dns() {
                  DOMAIN=$1
                  OUTPUT=$(nslookup $DOMAIN 2>&1)
                  CODE=$?
                  if [ $CODE -eq 0 ]; then
                    SEVERITY="INFO"
                    MESSAGE="DNS resolution to $DOMAIN successful"
                    echo "{\"timestamp\":\"$TIMESTAMP\",\"node\":\"$NODE_NAME\",\"severity\":\"$SEVERITY\",\"message\":\"$MESSAGE\",\"details\":\"$(echo "$OUTPUT" | tr '\n' ' ')\"}"
                  else
                    SEVERITY="ERROR"
                    MESSAGE="DNS resolution to $DOMAIN failed"
                    >&2 echo "{\"timestamp\":\"$TIMESTAMP\",\"node\":\"$NODE_NAME\",\"severity\":\"$SEVERITY\",\"message\":\"$MESSAGE\",\"details\":\"$(echo "$OUTPUT" | tr '\n' ' ')\"}"
                  fi
                }
                check_dns {{ .Values.externalDomain }}
                check_dns {{ .Values.internalDomain }}
                sleep {{ .Values.interval }}
              done
          env:
            - name: NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
          resources:
            requests:
              cpu: 25m
              memory: 32Mi
            limits:
              cpu: 50m
              memory: 64Mi
      tolerations:
        - operator: "Exists"
      restartPolicy: Always
