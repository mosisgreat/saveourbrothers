from rest_framework import serializers
from sos.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password') #  'first_name', 'last_name',

    def create(self, validated_data):
		user = super(UserSerializer, self).create(validated_data)
		user.set_password(validated_data['password'])
		user.save()
		return user

# ===============================================
#	
# ===============================================
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name') #  'first_name', 'last_name',

class AdrressSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Address
		fields = ('region', 'city', 'flat')

# Serializers define the API representation.
class SeekerSerializer(serializers.HyperlinkedModelSerializer):
	#user = serializers.StringRelatedField(many=False)
	user = PatientSerializer(required=True)
	addresses = AdrressSerializer(many=True, read_only=True)

	class Meta:
	    model = Seeker
	    fields = ('id', 'user', 'priority', 'photo', 'phone', 'addresses', 'raised_amount', 'target_amount', 'description', 'deadline')

	def create(self, validated_data):
		addresses_data = validated_data.pop('addresses')
		seeker = Seeker.objects.create(**validated_data)
		for address_data in addresses_data:
			Address.objects.create(seeker=seeker, **address_data)
		return seeker


class DonorSerializer(serializers.HyperlinkedModelSerializer):
	user = UserSerializer(required=True)

	class Meta:
		model = Donor
#		fields = ('id', 'full_name', 'email', 'phone', 'donor_type')
		fields = ('user', 'phone')

	def create(self, validated_data):
		user_data = validated_data.pop('user')
		user = UserSerializer.create(UserSerializer(), validated_data=user_data)
		print user
		donor, created = Donor.objects.update_or_create(
			user=user,
		    phone=validated_data.pop('phone'),
#		    donor_type=validated_data.pop('donor_type')
		)
		return donor